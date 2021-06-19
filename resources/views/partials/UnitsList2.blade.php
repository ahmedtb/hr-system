<ul class="nested">
    @foreach ($units as $unit)
        <li>
            <span>
                <a href="{{route('showUnit',$unit->id)}}">{{$unit->name}}</a>
            </span>
            @if ($unit->children()->count())
                @include('partials.UnitsList2',['units' => $unit->children])
            @endif
        </li>

    @endforeach
</ul>
